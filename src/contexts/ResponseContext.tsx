"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for your context
interface ResponseContextType {
    responseData: any;
    setResponseData: (data: any) => void;
}

// Create the context with a default value of `null`
const ResponseContext = createContext<ResponseContextType | undefined>(undefined);

// Provider component to wrap your app
export function ResponseProvider({ children }: { children: ReactNode }) {
    const [responseData, setResponseData] = useState<any>(null);

    return (
        <ResponseContext.Provider value={{ responseData, setResponseData }}>
            {children}
        </ResponseContext.Provider>
    );
}

// Custom hook to use the context
export function useResponse() {
    const context = useContext(ResponseContext);
    if (!context) {
        throw new Error("useResponse must be used within a ResponseProvider");
    }
    return context;
}
