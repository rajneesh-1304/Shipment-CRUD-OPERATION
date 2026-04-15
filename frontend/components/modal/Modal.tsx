'use client';
import "./modal.css";
import * as z from "zod";
import {  Box,  Button,  FormControl,  FormHelperText,  InputLabel,  MenuItem,  Select,  Snackbar,  TextField} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createShipmentThunk, getShipmentThunk } from "@/redux/features/shipment/shipmentSlice";

type ShipmentModalProps = {
  close: () => void;
};

const StopSchema = z.object({
  type: z.enum(["PICKUP", "DELIVERY"], "Stop type is required"),
  sequenceNumber: z.number().min(1),
});

const ShipmentSchema = z.object({
  title: z.string().trim().min(3, "Min 3 characters"),
  stops: z.array(StopSchema).min(1),
});

type ShipmentData = z.infer<typeof ShipmentSchema>;

export default function ShipmentModal({ close }: ShipmentModalProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useAppDispatch();
  const currentSchema = useAppSelector(state => state.schema?.currentSchema);
  const schemaId: any = currentSchema?.id;
  const { register, handleSubmit, control, formState: { errors }, reset } =
    useForm<ShipmentData>({
      resolver: zodResolver(ShipmentSchema),
      defaultValues: {
        stops: [{ sequenceNumber: 1, type: "PICKUP" }]
      }
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stops"
  });

  const onSubmit = async (data: ShipmentData) => {
    try {
      await dispatch(createShipmentThunk({data, schemaId})).unwrap();
      dispatch(getShipmentThunk(schemaId));
      setSnackbarMessage("Shipment added");
      setSnackbarOpen(true);
      setTimeout(() => close(), 800);
    } catch (err: any) {
      setSnackbarMessage(err);
      setSnackbarOpen(true);
    }
    reset();
  };

  return (
    <div className="main_modal">
      <div className="modal">

        <h3 className='shipmentHeading'>Add Shipment</h3>

        <form onSubmit={handleSubmit(onSubmit)}>

          <FormControl fullWidth>
            <TextField
              label="Title"
              size="small"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </FormControl>

          {fields.map((field, index) => (
            <div key={field.id} className="stopBox">

              <TextField
                label="Sequence"
                size="small"
                type="number"
                fullWidth
                defaultValue={field.sequenceNumber}
                {...register(`stops.${index}.sequenceNumber`, { valueAsNumber: true })}
                error={!!errors.stops?.[index]?.sequenceNumber}
                helperText={errors.stops?.[index]?.sequenceNumber?.message}
              />

              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select 
                defaultValue={field.type}
                {...register(`stops.${index}.type`)}>
                  <MenuItem value="PICKUP">PICKUP</MenuItem>
                  <MenuItem value="DELIVERY">DELIVERY</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.stops?.[index]?.type?.message}
                </FormHelperText>
              </FormControl>

              <Button size="small" onClick={() => remove(index)}>
                Remove
              </Button>

            </div>
          ))}

          <Button
            size="small"
            onClick={() =>
              append({ sequenceNumber: fields.length + 1, type: "PICKUP" })
            }
          >
            Add Stop
          </Button>

          <br /><br />

          <div className="btns">
            <Button type="submit" variant="contained" size="small">
            Save
          </Button>

          <Button onClick={close} size="small">
            Cancel
          </Button>
          </div>

        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
}