import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../shared";
import { LoginPage } from "../auth";
import { DcPage, MarvelPage } from "../heroes";

export const AppRouter = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="marvel" element={<MarvelPage />} />
                <Route path="dc" element={<DcPage />} />
                <Route path="/*" element={<Navigate to={'/marvel'} />} />
            </Routes>
        </>
    );
}
