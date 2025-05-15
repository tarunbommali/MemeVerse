import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = (data: { name: string; email: string; message: string }) => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully", formData);
      // Here you can send formData to an API
      setFormData({ name: "", email: "", message: "" }); // reset form
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
        <h2 className="text-2xl font-thin mb-4">Contact Our Team!</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 p-2 mb-1"
        />
        {formErrors.name && <span className="text-red-500 mb-4">{formErrors.name}</span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-gray-300 p-2 mb-1"
        />
        {formErrors.email && <span className="text-red-500 mb-4">{formErrors.email}</span>}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="border border-gray-300 p-2 mb-1"
        />
        {formErrors.message && <span className="text-red-500 mb-4">{formErrors.message}</span>}

        <button type="submit" className="bg-blue-500 text-white p-2 mt-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
