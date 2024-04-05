// component
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
// lib
import { Head } from "@inertiajs/react";

export default function UserEdit({ auth, example }) {
    const handleBack = (e) => {
        e.preventDefault();
        window.history.back();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Example
                </h2>
            }
        >
            <Head title="Edit Example" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <form className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={example.name}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="image" value="image" />

                                    <img src={example.image} alt={example.name} className="mt-1" style={{ maxWidth: '250px' }}/>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton
                                        className="ms-4"
                                        onClick={handleBack}
                                    >
                                        Back
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
