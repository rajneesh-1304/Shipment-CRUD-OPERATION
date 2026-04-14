'use client';
import "./schemamodal.css";
import * as z from "zod";
import { Box, Button, FormControl, Snackbar, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from '@hookform/resolvers/zod';
import { createSchemaThunk, getSchemaThunk } from "@/redux/features/schema/schemaSlice";

type SchemaModalProps = {
    close: () => void;
};

const Schema = z.object({
    title: z.string().trim().min(3, "Title Name must be at least 3 characters"),
});
type SchemaData = z.infer<typeof Schema>;

export default function SchemaModal({ close }: SchemaModalProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<SchemaData>({
        resolver: zodResolver(Schema),
    });

    const onSubmit = async (formData: SchemaData) => {
        try {
            await dispatch(createSchemaThunk(formData)).unwrap();
            dispatch(getSchemaThunk());
            setSnackbarMessage("Schema added successfully!");
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
        <div className="main_modal">
            <div className="modal">
                <h2 style={{ fontSize: '2vh', textAlign: 'center' }}>Add Schema</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="modal_form">
                    <Box sx={{ display: "flex", flexDirection: "column", width: 270, gap: 3 }}>
                        <FormControl>
                            <TextField
                                label="Task Name"
                                size="small"
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
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