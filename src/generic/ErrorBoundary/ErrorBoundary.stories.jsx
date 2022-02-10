import React from 'react'
import ErrorBoundary from './ErrorBoundary'

export default {
    title: "ErrorBoundary",
    component: ErrorBoundary
}

const ComponentWithoutError = () => <h1>Sin error</h1>
const ComponentWithError = () => <h1>{(undefined).hehe}</h1>

export const ErrorBoundaryExample = () => (
    <ErrorBoundary saludo="huehuehue" />
)

export const ErrorBoundaryWithError = () => (
    <ErrorBoundary>
        <ComponentWithError />
    </ErrorBoundary>
)

export const ErrorBoundaryWithoutError = () => (
    <ErrorBoundary>
        <ComponentWithoutError />
    </ErrorBoundary>
)