const Button=({children,btnColor="bg-blue-500",btnFunction})=>{
    return<button className={`${btnColor} text-white px-4 py-2 rounded`} onClick={btnFunction}>{children}</button>
}
export default Button;