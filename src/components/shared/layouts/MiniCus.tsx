

import React from "react";
import Container from "@/components/shared/Container"
import ProfileSideBar from "@/components/customer/Sidebar"


const CustomerProfileLayout = ({ children,user,subselect,selectedPage }:any) => {
  return (
    <Container>
        <div className="grid grid-cols-12 mt-8">
            <div className="col-span-12 lg:col-span-3 ">
              <div className="lg:sticky lg:top-20">
                <ProfileSideBar                     
                      imageUrl={user.imageUrl}
                      username={user.username}
                      subselect={subselect} 
                      selectedPage={selectedPage} />
              </div>               
            </div>
            <div className="min-h-[500px] w-full col-span-12 lg:col-span-8 rounded-lg">
                {children}
            </div>

        </div>
    </Container>
  );
};

export default CustomerProfileLayout;
