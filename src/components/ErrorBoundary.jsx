import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      console.error("ErrorBoundary caught an error", error, info);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="error">
            Something went wrong... <Link to="/">Zurück zur Startseite</Link>{" "}
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;