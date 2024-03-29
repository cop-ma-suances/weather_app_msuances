import React, {Component} from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo){
        console.log("Error: ", error)
        console.log("ErrorInfo: ", errorInfo)
    }

    render() {
        return (
            this.state.hasError ? 
            <h1>Se produjo un error</h1>
            :
            (this.props.children)
        )
    }
}

export default ErrorBoundary