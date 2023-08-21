import styles from './buttons.module.css';

interface ButtonProps {
    className?: string,
    children?: string,
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default function Button ({ className, children, ...props }: ButtonProps) {
    return <button className={`${styles.button} ${className}`} {...props}>{children}</button>;
}