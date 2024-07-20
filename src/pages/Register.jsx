import { useState } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { Link } from "react-router-dom";
import GoogleIcon from "../assets/google.svg";
import EyeOpen from "../assets/eye-open.svg";
import EyeClosed from "../assets/eye-closed.svg";

function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center px-4 md:px-6">
      <div className="absolute top-5 left-5">
        <p className="text-xl md:text-2xl font-semibold tracking-widest text-gray-700">
          LOGO
        </p>
      </div>

      <div className="flex md:w-[30rem] flex-col gap-5 px-5 py-8 my-5 rounded-lg border-[1px] border-gray-300 w-[90%] sm:w-[25rem]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl text-center font-medium tracking-widest uppercase">
            Register
          </h2>

          <div className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className="p-3 border-[1px] border-gray-200 rounded-md w-full focus:outline-none focus:border-[#2db2eb]"
                {...register("name", {
                  required: "Name is required",
                  minLength: [3, "Name cannot be less than characters"],
                })}
              />
              {errors?.name && (
                <p className="my-1 text-red-500 text-sm font-medium">
                  {errors?.name?.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Email address"
                className="p-3 border-[1px] border-gray-200 rounded-md w-full focus:outline-none focus:border-[#2db2eb]"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    isEmail(value) || "Invalid email provided",
                })}
              />
              {errors?.email && (
                <p className="my-1 text-red-500 text-sm font-medium">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center w-full relative">
                <input
                  type={isPasswordShown ? "text" : "password"}
                  placeholder="Password"
                  className="p-3 border-[1px] border-gray-200 rounded-md w-full mr-auto focus:outline-none focus:border-[#2db2eb]"
                  {...register("password", {
                    required: "Password is required",
                    minLength: [8, "Password cannot be less than 8 characters"],
                    validate: (value) =>
                      getValues().passwordConfirm === value ||
                      "Passwords don't match",
                  })}
                />

                <img
                  src={isPasswordShown ? EyeClosed : EyeOpen}
                  alt="Eye open icon"
                  className={`absolute top-1/2 -translate-y-1/2 right-2 ${
                    isPasswordShown ? "mt-3 -mr-[10px]" : "mt-1"
                  }`}
                  width={isPasswordShown ? 40 : 32}
                  height={isPasswordShown ? 40 : 32}
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                />
              </div>
              {errors?.password && (
                <p className="my-1 text-red-500 text-sm font-medium">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center w-full relative">
                <input
                  type={isPasswordConfirmShown ? "text" : "password"}
                  placeholder="Password Confirmation"
                  className="p-3 border-[1px] border-gray-200 rounded-md w-full mr-auto focus:outline-none focus:border-[#2db2eb]"
                  {...register("passwordConfirm", {
                    required: "Password is required",
                    minLength: [8, "Password cannot be less than 8 characters"],
                    validate: (value) =>
                      getValues().password === value || "Passwords don't match",
                  })}
                />

                <img
                  src={isPasswordConfirmShown ? EyeClosed : EyeOpen}
                  alt="Eye open icon"
                  className={`absolute top-1/2 -translate-y-1/2 right-2 ${
                    isPasswordConfirmShown ? "mt-3 -mr-[10px]" : "mt-1"
                  }`}
                  width={isPasswordShown ? 48 : 32}
                  height={isPasswordShown ? 48 : 32}
                  onClick={() =>
                    setIsPasswordConfirmShown(!isPasswordConfirmShown)
                  }
                />
              </div>
              {errors?.passwordConfirm && (
                <p className="my-1 text-red-500 text-sm font-medium">
                  {errors?.passwordConfirm?.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <button
                type="submit"
                className="p-3 w-1/2 text-md font-semibold text-white bg-[#2db2eb] rounded-md"
              >
                Register
              </button>
            </div>
          </div>

          <div className="flex items-center text-md text-gray-600 gap-1">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="text-[#2db2eb] font-semibold underline"
            >
              Login.
            </Link>
          </div>
        </form>

        <div className="flex items-center justify-center gap-3 text-sm sm:text-md p-3 border-[1px] border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer">
          <img src={GoogleIcon} alt="Google icon" />
          <p>Continue with Google instead</p>
        </div>
      </div>
    </main>
  );
}

export default Register;
