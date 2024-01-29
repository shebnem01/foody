import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import Leftsidebar from "../../components/Clientrestaurants/leftsidebar";
import Rightsidebar from "../../components/Clientrestaurants/rightsidebar";
import ClientContainer from "../../components/common/ClientContainer/ClientContainer";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const index = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const router = useRouter();
  const handleCategoryClick = (categoryId,categoryName) => {
    router.push({
      pathname: "/restaurants",
      query: { category: categoryName },
    });
    setSelectedCategoryId(categoryId);
  };

  return (
    <ClientContainer>
      <div className="lg:flex gap-7 mt-4 mb-6">
        <Leftsidebar handleCategoryClick={handleCategoryClick} />
        {/* <Rightdetail /> */}
        <ToastContainer />
        <Rightsidebar categoryId={selectedCategoryId} />
      </div>
    </ClientContainer>
  );
};

export default index;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
