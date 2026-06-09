import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Section error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 px-6 text-center">
          <AlertTriangle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            Something went wrong
          </h3>
          <p className="text-muted-foreground mb-4">
            {this.props.fallbackMessage || 'This section failed to load.'}
          </p>
          <Button variant="outline" onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackMessage: PropTypes.string,
};

export default ErrorBoundary;
