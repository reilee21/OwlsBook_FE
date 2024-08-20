import Main from "@/components/shared/layouts/Main";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Main>
      {children}
    </Main>
  

  );
}
