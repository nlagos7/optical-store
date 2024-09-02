import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import LoginArea from "@/components/login-register/login-area";

export const metadata = {
  title: "Andes Vision - Iniciar sesión",
};

export default function LoginPage() {
  return (
    <Wrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Inciar sesión" subtitle="Inciar sesión" center={true} />
      <LoginArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
}
