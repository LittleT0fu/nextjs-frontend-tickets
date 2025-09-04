import React from "react";
import { Toaster } from "react-hot-toast";

function ToasterProvider() {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                        fontFamily: "var(--font-roboto)",
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: "#C3F4D5",
                            color: "#000",
                            fontFamily: "var(--font-roboto)",
                        },
                        iconTheme: {
                            primary: "#4ade80",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        duration: 5000,
                        style: {
                            background: "#FAA18F",
                            color: "#000",
                            fontFamily: "var(--font-roboto)",
                        },
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                }}
            />
        </>
    );
}

export default ToasterProvider;
