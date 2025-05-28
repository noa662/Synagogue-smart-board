import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const selectedRole = watch("role");
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.role === "admin" && !data.adminPassword) {
      toast.current.show({
        severity: "warn",
        summary: "שגיאה",
        detail: "יש להזין סיסמת מנהל",
        life: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        {
          username: data.username,
          password: data.password,
          email: data.email,
          role: data.role,
          adminPassword: data.role === "admin" ? data.adminPassword : null,
        }
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      dispatch(setUser(user));
      toast.current.show({
        severity: "success",
        summary: "הצלחה",
        detail: "המשתמש נרשם בהצלחה",
        life: 3000,
      });

      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin" : "/");
      }, 1000);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "שגיאה",
        detail:
          err.response?.data?.message || "אירעה שגיאה בהרשמה, נסה שוב",
        life: 4000,
      });
      console.error("Registration error:", err);
    }
  };

  const handleRoleChange = (role) => {
    const currentRole = watch("role");
    setValue("role", currentRole === role ? null : role);
  };

  return (
    <div className="flex justify-content-center mt-8 px-4">
      <Toast ref={toast} />
      <Card title="טופס הרשמה" className="w-full max-w-[500px] shadow-3">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4">

          {/* Username */}
          <FloatLabel>
            <InputText
              id="username"
              {...register("username", { required: "שדה חובה" })}
              className="w-full"
            />
            <label htmlFor="username">שם משתמש</label>
          </FloatLabel>
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username.message}</span>
          )}

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "שדה חובה",
              validate: (value) => {
                const minLength = /.{8,}/.test(value);
                const hasUpper = /[A-Z]/.test(value);
                const hasNumber = /\d/.test(value);
                const hasSpecial = /[!@#$%^&*]/.test(value);
                if (!minLength) return "הסיסמה חייבת להיות לפחות 8 תווים";
                if (!hasUpper) return "הסיסמה חייבת להכיל אות גדולה";
                if (!hasNumber) return "הסיסמה חייבת להכיל מספר";
                if (!hasSpecial) return "הסיסמה חייבת להכיל תו מיוחד";
                return true;
              },
            }}
            render={({ field }) => (
              <FloatLabel>
                <Password id="password" {...field} toggleMask className="w-full" />
                <label htmlFor="password">סיסמה</label>
              </FloatLabel>
            )}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          {/* Email */}
          <FloatLabel>
            <InputText
              id="email"
              {...register("email", {
                required: "שדה חובה",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "אנא הזן כתובת אימייל תקינה",
                },
              })}
              className="w-full"
            />
            <label htmlFor="email">אימייל</label>
          </FloatLabel>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          {/* Role Selection */}
          <div className="flex flex-column gap-2 mt-3">
            <span className="text-sm text-gray-600 mb-1">בחר תפקיד:</span>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="user"
                onChange={() => handleRoleChange("user")}
                checked={selectedRole === "user"}
              />
              <label htmlFor="user" className="cursor-pointer">משתמש</label>
            </div>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="admin"
                onChange={() => handleRoleChange("admin")}
                checked={selectedRole === "admin"}
              />
              <label htmlFor="admin" className="cursor-pointer">מנהל</label>
            </div>
            {errors.role && (
              <span className="text-red-500 text-sm">{errors.role.message}</span>
            )}
          </div>
          {/* Hidden role field */}
          <input type="hidden" {...register("role", { required: "יש לבחור תפקיד" })} />

          {/* Admin Password */}
          {selectedRole === "admin" && (
            <Controller
              name="adminPassword"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <Password
                    id="adminPassword"
                    {...field}
                    toggleMask
                    feedback={false}
                    className="w-full"
                  />
                  <label htmlFor="adminPassword">סיסמת מנהל</label>
                </FloatLabel>
              )}
            />
          )}

          {/* Submit Button */}
          <Button
            label="הירשם"
            icon="pi pi-user-plus"
            className="w-full mt-4"
            type="submit"
          />
        </form>
      </Card>
    </div>
  );
};

export default Register;
