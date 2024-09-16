import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import SearchArea from "@/components/search/search-area";
import Footer from "@/layout/footers/footer";


export const metadata = {
  title: "Andes Visión - Busqueda",
};

export default function SearchPage() {
  return (
    <Wrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Busqueda de productos" subtitle="Busqueda" />
      <SearchArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
}
