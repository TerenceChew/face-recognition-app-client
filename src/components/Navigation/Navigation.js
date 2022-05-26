const Navigation = ({ updateRoute, signedIn }) => {
  return (
    <nav style={{display: "flex", justifyContent:"flex-end"}}>
      {
          signedIn
        ? <p onClick={() => updateRoute('sign-out')} className="f4 link dim black underline pa3 pointer">Sign Out</p>
        : <>
            <p onClick={() => updateRoute('sign-in')} className="f4 link dim black underline pa3 pointer">Sign In</p>
            <p onClick={() => updateRoute('register')} className="f4 link dim black underline pa3 pointer">Register</p>
          </>
      }   
    </nav>
  )
}

export default Navigation;
