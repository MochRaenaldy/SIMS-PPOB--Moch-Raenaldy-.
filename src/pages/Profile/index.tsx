import Card from "@/components/Card";
import ProfilePage from "./Profile";

export default function Profile() {
  return (
    <div>
      <Card dashboard={false}>
        <ProfilePage />
      </Card>
    </div>
  );
}
