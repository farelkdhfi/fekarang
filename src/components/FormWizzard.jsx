import { useState } from "react";
import InputField from "./InputField";

function FormWizard({ steps, initialData, onSubmit }) {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(0);

    const validate = (field, value) => {
        const newErrors = { ...errors };
        if (steps[currentStep].required && !value) {
            newErrors[field] = `${steps[currentStep].label} wajib diisi`;
        } else {
            delete newErrors[field];
        }
        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
        validate(name, files[0]);
    };

    const handleNext = () => {
        const currentField = steps[currentStep].name;
        validate(currentField, formData[currentField]);

        if (!errors[currentField]) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert("Mohon periksa kembali semua input");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {steps[currentStep].title || "Form Wizard"}
            </h1>

            {steps[currentStep].type === "file" ? (
                <InputField
                    label={steps[currentStep].label}
                    name={steps[currentStep].name}
                    type={steps[currentStep].type}
                    accept={steps[currentStep].accept}
                    onChange={handleFileChange}
                    error={errors[steps[currentStep].name]}
                    required={steps[currentStep].required}
                />
            ) : (
                <InputField
                    label={steps[currentStep].label}
                    name={steps[currentStep].name}
                    value={formData[steps[currentStep].name]}
                    onChange={handleChange}
                    placeholder={steps[currentStep].placeholder}
                    error={errors[steps[currentStep].name]}
                    required={steps[currentStep].required}
                />
            )}

            <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-600"
                    >
                        Previous
                    </button>
                )}
                {currentStep < steps.length - 1 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600"
                    >
                        Submit
                    </button>
                )}
            </div>
        </form>
    );
}

export default FormWizard;
