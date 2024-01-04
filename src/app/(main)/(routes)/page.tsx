import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="h-screen">
      <p>Hello there!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
