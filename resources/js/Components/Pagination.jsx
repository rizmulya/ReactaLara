import { Link } from "@inertiajs/react";

const Pagination = ({ data, type = "paginate()" }) => {
    if (!data) return null;

    // pagination with paginate()
    if (data.links)
        return (
            <div className="mt-6 flex justify-center">
                {data.links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.url}
                        preserveScroll
                        className={`mr-1 px-2 py-1 ${
                            link.active
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700"
                        } ${
                            link.url === null
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-700"
                        }`}
                    >
                        {link.label
                            .replace(/&laquo;/g, "<")
                            .replace(/&raquo;/g, ">")}
                    </Link>
                ))}
            </div>
        );

    // pagination with paginate()
    return (
        <div className="mt-6 flex justify-center">
            {data.prev_page_url && (
                <Link
                    href={data.prev_page_url}
                    className="mr-1 px-2 py-1 text-gray-700"
                    preserveScroll
                >
                    {"< Prev"}
                </Link>
            )}

            <span className="mr-1 px-2 py-1 bg-blue-500 text-white">
                {data.current_page}
            </span>

            {data.next_page_url && (
                <Link
                    href={data.next_page_url}
                    className="ml-1 px-2 py-1 text-gray-700"
                    preserveScroll
                >
                    {"Next >"}
                </Link>
            )}
        </div>
    );
};

export default Pagination;
