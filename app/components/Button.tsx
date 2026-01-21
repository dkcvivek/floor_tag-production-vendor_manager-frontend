import Link from "next/link"

const Button = ({label, src}: {label: string, src: string}) => {
  return (
    <Link href={src}
      className="
        w-full
        bg-blue-500
        text-white
        font-semibold
        py-5
        rounded-xl
        text-center
        shadow-sm
        active:scale-95
        transition
      "
    >
      {label}
    </Link>
  )
}

export default Button