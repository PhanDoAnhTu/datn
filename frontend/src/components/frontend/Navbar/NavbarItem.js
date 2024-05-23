
import { Link } from "react-router-dom";

export default function NavbarItem({ Icon, Title, Summary }) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        {Icon}
      </div>
      <div className="flex-auto">
        <Link to="#" className="block font-semibold text-gray-900">
          {Title}
          <span className="absolute inset-0" />
        </Link>
        <p className="mt-1 text-gray-600">{Summary}</p>
      </div>
    </div>
  );
}
