// component
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
// lib
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from 'react';

export default function ExampleCreate({ auth }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        name: "",
        image: null
    });

    const [imagePreview, setImagePreview] = useState(data.image || '');

    useEffect(() => {
        if (data.image && data.image instanceof File) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setImagePreview(fileReader.result);
            };
            fileReader.readAsDataURL(data.image);
        }
    }, [data.image]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("example.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Example
                </h2>
            }
        >
            <Head title="Add Example" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-6"
                            >
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="image" value="image" />

                                    <input
                                        type="file"
                                        className="w-full px-4 py-2"
                                        label="image"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />

                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />

                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="mt-1" style={{ maxWidth: '250px' }} />
                                    )}
                                </div>

                                {progress && (
                                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" width={progress.percentage}> {progress.percentage}%</div>
                                  </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
