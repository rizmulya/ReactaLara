// component
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Pagination from "@/Components/Pagination";
import NotificationBox from "@/Components/NotificationBox";
// lib
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import { useEnc } from "@/Lib/Encryptor";

export default function Example({ examples, search }) {
    const { auth, flash, cryptojskey } = usePage().props;

    const { delete: destroy } = useForm();
    const { data, setData, get, processing } = useForm({
        search: search || "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("example.index"), {
            preserveState: true,
        });
    };

    const handleDelete = (id) => {
        destroy(route("example.destroy", { id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between  md:items-start">
                    <div className="md:flex md:items-center md:justify-start">
                        <Link
                            href={route("example.create")}
                            className="order-2 md:order-2"
                        >
                            <PrimaryButton className="mb-2 md:mb-0 md:mr-4">
                                Add
                            </PrimaryButton>
                        </Link>
                        <h2 className="order-1 md:order-2 font-semibold text-xl text-gray-800 leading-tight mb-2 md:mb-0">
                            Examples Table
                        </h2>
                    </div>

                    <form onSubmit={handleSearch} className="">
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            placeholder="Search examples..."
                            className="border rounded py-1 mr-2"
                        />
                        <PrimaryButton className="" disabled={processing}>
                            search
                        </PrimaryButton>
                    </form>
                </div>
            }
        >
            <Head title="Examples" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            No
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examples &&
                                        examples.data.map((example, i) => (
                                            <tr key={example.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {(examples.current_page -
                                                        1) *
                                                        examples.per_page +
                                                        i +
                                                        1}
                                                </td>
                                                <td className="py-5 border-b border-gray-200 bg-white text-sm">
                                                    <img src={example.image} width="100px" />
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {example.name}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm min-w-[166px]">
                                                    <Link
                                                        href={route(
                                                            "example.show",
                                                            { id: useEnc(example.id, cryptojskey) }
                                                        )}
                                                        className="text-gray-600 hover:text-blue-900 mr-3"
                                                    >
                                                        Show
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "example.edit",
                                                            { id: useEnc(example.id, cryptojskey) }
                                                        )}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() =>
                                                            handleDelete(
                                                                useEnc(example.id, cryptojskey)
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination data={examples} />
                </div>
            </div>

            <NotificationBox message={flash.message} />
        </AuthenticatedLayout>
    );
}
