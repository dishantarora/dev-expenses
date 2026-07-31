import { Component, ReactNode } from "react";

type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
};

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {hasError: true, error };
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if(this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;