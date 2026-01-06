import { Formik } from "formik";
import { createTicketValidationSchema } from "../../../validations/ticket.validation";
import { useUserDashBoardContext } from "../../../pages/UserDashBoard/provider/UserDashBoardProvider";
import type { TicketFormValues } from "../../../types/ticket";
import { createTicket } from "../../../services/ticket/create";
import toast from "react-hot-toast";



const CreateTicket = () => {
  const {categories} =useUserDashBoardContext();
  const initialValues: TicketFormValues = {
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
  };

  return (
    <div className="w-full flex justify-center px-4 pt-4">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-xl p-6">
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
              {/* Title */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Title</legend>
                <input
                  type="text"
                  className={`input input-bordered ${
                    formik.touched.title && formik.errors.title
                      ? "input-error"
                      : ""
                  }`}
                  {...formik.getFieldProps("title")}
                  placeholder="Enter ticket title"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="label text-error">
                    {formik.errors.title}
                  </p>
                )}
              </fieldset>

              {/* Description */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Description</legend>
                <textarea
                  rows={3}
                  className={`textarea textarea-bordered ${
                    formik.touched.description &&
                    formik.errors.description
                      ? "textarea-error"
                      : ""
                  }`}
                  {...formik.getFieldProps("description")}
                  placeholder="Describe the issue"
                />
                {formik.touched.description &&
                  formik.errors.description && (
                    <p className="label text-error">
                      {formik.errors.description}
                    </p>
                  )}
              </fieldset>

              {/* Category */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Category</legend>
                <select
                  className={`select select-bordered ${
                    formik.touched.categoryId && formik.errors.categoryId
                      ? "select-error"
                      : ""
                  }`}
                  {...formik.getFieldProps("categoryId")}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {formik.touched.categoryId && formik.errors.categoryId && (
                  <p className="label text-error">
                    {formik.errors.categoryId}
                  </p>
                )}
              </fieldset>

              {/* Priority */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Priority</legend>
                <div className="flex gap-4">
                  {(["low", "medium", "high"] as const).map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 cursor-pointer"
                    >
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
                        onChange={() =>
                          formik.setFieldValue("priority", level)
                        }
                      />
                      <span className="capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
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
