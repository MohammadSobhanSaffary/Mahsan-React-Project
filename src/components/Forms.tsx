import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z
  .object({
    // firstName: z
    //   .string()
    //   .min(3, { message: "First name must be at least 3 characters" }),
    // lastName: z
    //   .string()
    //   .min(4, { message: "Last name must be at least 4 characters" }),
    email: z.string().min(1, { message: "Email required" }),
    // password: z
    //   .string()
    //   .min(6, { message: "Password must be at least 6 characters" }),
    // confirmPassword: z
    //   .string()
    //   .min(6, { message: "Password must be at least 6 characters" }),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    // }),
  }).refine((data) =>{try {
  JSON.parse(data.email);
}catch (err){
      return false;}

  return true;
  }, {
    path: ["email"],
    message: "not correct json format",
  });
type ValidationSchema = z.infer<typeof validationSchema>;

const Forms: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const submitFunction: SubmitHandler<ValidationSchema> = (data) => {
    console.log(JSON.parse(data.email));
  };

  return (
    <div className="w-full h-full shadow-lg flex items-center justify-center flex-col px-8 pt-6 pb-8 mb-4">
      <form
        className="w-1/4 shadow-lg flex items-center justify-center flex-col px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(submitFunction)}
      >
        {/*<div className="mb-4 md:flex md:justify-between">*/}
        {/*  <div className="mb-4 md:mr-2 md:mb-0">*/}
        {/*    <label*/}
        {/*      className="block mb-2 text-sm font-bold text-gray-700"*/}
        {/*      htmlFor="firstName"*/}
        {/*    >*/}
        {/*      First Name*/}
        {/*    </label>*/}
        {/*    <input*/}
        {/*      className="shadow-md w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"*/}
        {/*      id="firstName"*/}
        {/*      type="text"*/}
        {/*      placeholder="First Name"*/}
        {/*      {...register("firstName")}*/}
        {/*    />*/}
        {/*    {errors.firstName && (*/}
        {/*      <p className="text-xs italic text-red-500 mt-2">*/}
        {/*        {errors.firstName?.message}*/}
        {/*      </p>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*  <div className="md:ml-2">*/}
        {/*    <label*/}
        {/*      className="block mb-2 text-sm font-bold text-gray-700"*/}
        {/*      htmlFor="lastName"*/}
        {/*    >*/}
        {/*      Last Name*/}
        {/*    </label>*/}
        {/*    <input*/}
        {/*      className="shadow-md w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"*/}
        {/*      id="lastName"*/}
        {/*      type="text"*/}
        {/*      placeholder="Last Name"*/}
        {/*      {...register("lastName")}*/}
        {/*    />*/}
        {/*    {errors.lastName && (*/}
        {/*      <p className="text-xs italic text-red-500 mt-2">*/}
        {/*        {errors.lastName?.message}*/}
        {/*      </p>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="mb-4 w-full px-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700 mx-2"
            htmlFor="email"
          >
            Email
          </label>
          <textarea
            className="shadow-md w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline "
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
        </div>
        {/*<div className="mb-4 md:flex md:justify-between">*/}
        {/*  <div className="mb-4 md:mr-2 md:mb-0">*/}
        {/*    <label*/}
        {/*      className="block mb-2 text-sm font-bold text-gray-700"*/}
        {/*      htmlFor="password"*/}
        {/*    >*/}
        {/*      Password*/}
        {/*    </label>*/}
        {/*    <input*/}
        {/*      className="shadow-md w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"*/}
        {/*      id="password"*/}
        {/*      type="password"*/}
        {/*      {...register("password")}*/}
        {/*    />*/}
        {/*    {errors.password && (*/}
        {/*      <p className="text-xs italic text-red-500 mt-2">*/}
        {/*        {errors.password?.message}*/}
        {/*      </p>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*  <div className="md:ml-2">*/}
        {/*    <label*/}
        {/*      className="block mb-2 text-sm font-bold text-gray-700"*/}
        {/*      htmlFor="c_password"*/}
        {/*    >*/}
        {/*      Confirm Password*/}
        {/*    </label>*/}
        {/*    <input*/}
        {/*      className="shadow-md w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"*/}
        {/*      id="c_password"*/}
        {/*      type="password"*/}
        {/*      {...register("confirmPassword")}*/}
        {/*    />*/}
        {/*    {errors.confirmPassword && (*/}
        {/*      <p className="text-xs italic text-red-500 mt-2">*/}
        {/*        {errors.confirmPassword?.message}*/}
        {/*      </p>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="mb-4">*/}
        {/*  <input type="checkbox" id="terms" {...register("terms")} />*/}
        {/*  <label*/}
        {/*    htmlFor="terms"*/}
        {/*    className="ml-2 mb-2 text-sm font-bold text-gray-700"*/}
        {/*  >*/}
        {/*    Accept Terms & Conditions*/}
        {/*  </label>*/}
        {/*  {errors.terms && (*/}
        {/*    <p className="text-xs italic text-red-500 mt-2">*/}
        {/*      {errors.terms?.message}*/}
        {/*    </p>*/}
        {/*  )}*/}
        {/*</div>*/}
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register Account
          </button>
        </div>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <a
            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center">
          <a
            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
            href="#"
          >
            Already have an account? Login!
          </a>
        </div>
      </form>
    </div>
  );
};

export default Forms;
