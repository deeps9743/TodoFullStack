const person = {
  name: 'John',
  address: {
    landmark: 'Central Park',
    city: 'New York',
    country: 'USA'
  },
  profiles: ["Facebook", "Twitter", "LinkedIn"],
  printProfiles: () => {
    person.profiles.map((profile) => {
        console.log(profile);
    }); 
  }
};
export default function LearningJavaScript() {
  return (
    <>
    <div className="Learning_component">hello world</div>
    <div>{person.name}</div>
    <div>{person.address.landmark}</div>
    <div>{person.address.city}</div>
    <div>{person.profiles[0]}</div>
    <div>{person.profiles[1]}</div>
    <div>{person.printProfiles()}</div>
    </>
  );
}