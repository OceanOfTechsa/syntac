import "react"

declare module "react" {
    interface CSSProperties {
        "--duration"?: number | string
        "--radius"?: number | string
        "--angle"?: number | string
    }
}