import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = (data: { password: string; email: string }) => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!data.password) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }

    return errors;
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully", formData);
      // Here you can send formData to an API
      setFormData({ password: "", email: "" }); // reset form
      setFormErrors({}); // clear errors
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col m-auto">
      <form
        onSubmit={onSubmitForm}
        className="flex flex-col w-full md:w-1/2 shadow-2xl p-4 m-4 bg-white rounded-lg"
      >
        <h2 className="text-2xl font-thin mb-4">Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-gray-300 p-2 mb-1"
        />
        {formErrors.email && (
          <span className="text-red-500 mb-4">{formErrors.email}</span>
        )}

        <label htmlFor="password">Name</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border border-gray-300 p-2 mb-1"
        />
        {formErrors.name && (
          <span className="text-red-500 mb-4">{formErrors.name}</span>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
