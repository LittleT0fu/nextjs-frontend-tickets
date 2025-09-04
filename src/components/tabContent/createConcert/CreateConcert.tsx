"use client";
import React from "react";
import { Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "@/config/APIurl";

export default function CreateConcert() {
    const [formData, setFormData] = React.useState({
        concertName: "",
        totalSeats: 0,
        description: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form
        if (
            !formData.concertName ||
            !formData.description ||
            !formData.totalSeats
        ) {
            toast.error("Please fill in all fields");
            return;
        }

        // Show loading toast
        const loadingToast = toast.loading("Creating concert...");

        try {
            const newConcertData = {
                name: formData.concertName,
                description: formData.description,
                seat: Number(formData.totalSeats),
            };

            // fetch data with backend
            const res = await fetch(API_URL + "/concerts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newConcertData),
            });
            const data = await res.json();
            // Dismiss loading toast
            toast.dismiss(loadingToast);

            if (res.ok) {
                toast.success("Concert created successfully!");
            } else {
                const newMessage = data.message.join(",\n");
                toast.error("Failed to create concert. \n" + newMessage);
            }

            // Reset form
            setFormData({ concertName: "", description: "", totalSeats: 0 });
        } catch (error) {
            // Dismiss loading toast
            toast.dismiss(loadingToast);

            // Show error toast
            toast.error("Failed to create concert. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-4 p-6 rounded-lg bg-white border-1 border-[#C2C2C2]">
            <h1 className="text-[#1692EC] text-2xl font-semibold">Create</h1>
            <hr className="border-[#C2C2C2]" />
            <form action="">
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="concertName" className="block mb-2">
                            Concert Name
                        </label>
                        <input
                            type="text"
                            id="concertName"
                            placeholder="Please input concert's name"
                            className="w-full p-2 border border-[#C2C2C2] rounded"
                            value={formData.concertName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="totalSeats" className="block mb-2">
                            Total of seat
                        </label>
                        <input
                            type="number"
                            id="totalSeats"
                            placeholder="500"
                            className="w-full p-2 border border-[#C2C2C2] rounded"
                            value={formData.totalSeats}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Please input description"
                            className="w-full p-2 border border-[#C2C2C2] rounded h-32"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#1692EC] flex gap-2 items-center cursor-pointer text-white px-6 py-2 rounded self-end hover:bg-[#1282d4]"
                        onClick={handleSubmit}
                    >
                        <Save size={18} strokeWidth={1} />
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
