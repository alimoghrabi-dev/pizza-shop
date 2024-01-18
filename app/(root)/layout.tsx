import Header from "@/components/layout/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto py-5 px-6 sm:px-10 md:px-12 lg:px-20 grainy">
      <Header />
      {children}
    </main>
  );
}
