import { Formik } from "formik";
import { createTicketValidationSchema } from "../../../validations/ticket.validation";
import type { TicketFormValues } from "../../../types/ticket";
import { createTicket } from "../../../services/ticket/create";
import toast from "react-hot-toast";
import { fetchCategories } from "../../../services/categories/fetchCategories";
import { useEffect, useState } from "react";
import type { Category } from "../../../types/category";

const CreateTicket = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      if (cats) setCategories(cats);
    };
    loadCategories();
  }, []);

  const initialValues: TicketFormValues = {
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
  };

  return (
    <div className="w-full flex justify-center px-4 pt-4 mt-20">
      <div className="w-full max-w-2xl shadow-xl rounded-xl p-6 bg-gray-900 border border-white/10 text-white">
        <h2 className="text-xl font-semibold mb-4">Create Ticket</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={createTicketValidationSchema}
          validateOnMount
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              const { status, data } = await createTicket(values);
              if (status === 201) {
                toast.success(data.message || "Ticket created successfully");
                resetForm();
              }
            } catch (err) {
              toast.error("Failed to create ticket");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="space-y-4">

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-white">Title</legend>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-gray-800 text-white placeholder-white/60 ${
                    formik.touched.title && formik.errors.title ? "input-error" : ""
                  }`}
                  {...formik.getFieldProps("title")}
                  placeholder="Enter ticket title"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="label text-error">{formik.errors.title}</p>
                )}
              </fieldset>

             
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-white">Description</legend>
                <textarea
                  rows={3}
                  className={`textarea textarea-bordered w-full bg-gray-800 text-white placeholder-white/60 ${
                    formik.touched.description && formik.errors.description ? "textarea-error" : ""
                  }`}
                  {...formik.getFieldProps("description")}
                  placeholder="Describe the issue"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="label text-error">{formik.errors.description}</p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-white">Category</legend>
                <select
                  className={`select select-bordered w-full bg-gray-800 text-white placeholder-white/60 ${
                    formik.touched.categoryId && formik.errors.categoryId ? "select-error" : ""
                  }`}
                  {...formik.getFieldProps("categoryId")}
                >
                  <option value="" disabled>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {formik.touched.categoryId && formik.errors.categoryId && (
                  <p className="label text-error">{formik.errors.categoryId}</p>
                )}
              </fieldset>

            
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-white">Priority</legend>
                <div className="flex gap-4">
                  {(["low", "medium", "high"] as const).map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        className={`radio ${
                          level === "low"
                            ? "radio-success"
                            : level === "medium"
                            ? "radio-warning"
                            : "radio-error"
                        }`}
                        value={level}
                        checked={formik.values.priority === level}
                        onChange={() => formik.setFieldValue("priority", level)}
                      />
                      <span className="capitalize text-white">{level}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              
              <button
                type="submit"
                className="btn btn-primary w-full mt-2 bg-primary text-white"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Create Ticket
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTicket;
