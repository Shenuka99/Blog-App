import Form from "@/components/form";
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Page() {

    //made async for authentication

    // const {isAuthenticated} = getKindeServerSession()

    // console.log("isAuthenticated", isAuthenticated)

    // if(!(await isAuthenticated())){
    //     redirect('/api/auth/login?post_login_redirect_url=/create-post')
    // }

  return (
    <main className="text-center pt-16"> 
        <h1 className="text-4xl md:text-5xl font-bold mb-5">Create post</h1>

        <Form/>

        <LogoutLink>Log out</LogoutLink>
    </main>
  )
}
