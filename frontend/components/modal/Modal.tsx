'use client';
import "./modal.css";
import * as z from "zod";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from "@/redux/hooks";
import { createShipmentThunk } from "@/redux/features/shipment/shipmentService";

type ShipmentModalProps = {
    close: () => void;
};

const Shipment = z.object({
    title: z.string().trim().min(3, "Title Name must be at least 3 characters"),
    sequenceNumber: z.number().min(1).max(10),
    type: z.string("Shipment type is required"),
});
type ShipmentData = z.infer<typeof Shipment>;

export default function ShipmentModal({ close }: ShipmentModalProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ShipmentData>({
        resolver: zodResolver(Shipment),
    });

    const onSubmit = async (formData: ShipmentData) => {
        try {
            await dispatch(createShipmentThunk(formData)).unwrap();

            setSnackbarMessage("Shipment added successfully!");
            setSnackbarOpen(true);

            setTimeout(() => close(), 1000);
        } catch (error: any) {
            setSnackbarMessage(error);
            setSnackbarOpen(true);
        }

        reset();
    };

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <div className="modal_overlay">
            <div className="modal">
                <h2 style={{ fontWeight: '900', fontSize: '2vh' }}>Add Shipment</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="modal_form">
                    <Box sx={{ display: "flex", flexDirection: "column", width: 350, gap: 3 }}>
                        <FormControl>
                            <TextField
                                label="Shipment Name"
                                size="small"
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                label='Sequence Number'
                                size='small'
                                type='number'
                                {...register('sequenceNumber')}
                                error={!!errors.sequenceNumber}
                                helperText={errors.sequenceNumber?.message}
                            />
                        </FormControl>

                        <FormControl
                            fullWidth
                            variant="outlined"
                            size="small"
                            error={!!errors.type}
                        >
                            <InputLabel
                                id="demo-simple-select-standard-label"
                                sx={{ fontSize: 14 }}
                            >
                                Shipment Type
                            </InputLabel>

                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                {...register("type")}
                                sx={{
                                    minHeight: 32,
                                    paddingY: "2px",
                                }}
                            >
                                <MenuItem value="PICKUP">PICKUP</MenuItem>
                                <MenuItem value="DELIVERY">DELIVERY</MenuItem>
                            </Select>

                            <FormHelperText sx={{ fontSize: 11, mt: 0.5 }}>
                                {errors.type?.message}
                            </FormHelperText>
                        </FormControl>

                        <div className="modal_actions">
                            <Button variant="contained" type="submit">Save</Button>
                            <Button variant="outlined" onClick={close}>Cancel</Button>
                        </div>
                    </Box>
                </form>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
}