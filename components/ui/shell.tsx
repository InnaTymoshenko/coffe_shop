interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
	as?: React.ElementType
}

const Shell = ({ className, ...props }: ShellProps) => {
	return <div className={className} {...props} />
}

export default Shell
