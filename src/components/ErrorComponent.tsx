import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorProps {
    message: string;
    onRetry?: () => void; // Optional retry action
}

const ErrorComponent: React.FC<ErrorProps> = ({ message, onRetry }) => {
    return (
        <Alert variant="destructive">
            <AlertTitle>Oops! Something went wrong.</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            {onRetry && (
                    <Button variant="outline" onClick={onRetry}>
                        Retry
                    </Button>
            )}
        </Alert>
    );
};

export default ErrorComponent;
