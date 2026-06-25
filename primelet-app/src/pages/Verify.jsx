import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Verify = () => {
  const { verify_email, loading } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState("verifying"); 
  const [message, setMessage] = useState("Verifying your email address, please wait...");
  
  const hasCalled = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      return;
    }

    if (hasCalled.current) return;
    hasCalled.current = true;

    const performVerification = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. Missing token.");
        return;
      }

      const result = await verify_email({ verificationToken: token });
      if (result) {
        setStatus("success");
        setMessage("Your email has been successfully verified!");
      } else {
        setStatus("error");
        setMessage("Verification failed. The link may have expired or is invalid.");
      }
    };

    performVerification();
  }, [searchParams, verify_email]);

  return (
    <div className="flex flex-col p-6 items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-6 m-2 p-6 rounded-lg bg-gray-100 shadow-2xl w-full max-w-sm text-center">
        
        {/* Title Header */}
        <div className="bg-blue-500 px-4 py-2 rounded-full">
          <h1 className="text-amber-500 text-2xl font-bold">Account Verification</h1>
        </div>

        {/* Status Indicator Banner */}
        <div className={`px-4 py-2 rounded-2xl text-white font-semibold text-sm ${
          status === "verifying" ? "bg-gray-400" : status === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {status === "verifying" && "Processing..."}
          {status === "success" && "Success!"}
          {status === "error" && "Error"}
        </div>

        {/* Informative Text */}
        <p className="text-gray-700 font-medium text-sm px-2">
          {message}
        </p>

        {/* Dynamic Navigation Button */}
        <button
          onClick={() => navigate("/login")}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-2 rounded-full text-white font-bold mt-2"
        >
          {status === "verifying" ? "Please wait..." : "Go to Sign In"}
        </button>

      </div>
    </div>
  );
};

export default Verify;