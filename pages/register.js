import { useEffect, useState } from 'react';
const KeycloakUserRegistration = ({userData}) => {
  console.log(userData,"userdta")
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState('');
   const [password, setPassword] = useState('');
  const serverUrl = 'https://nirmaan-wep.azurewebsites.net';
  const realmName = 'Springboard';
   const clientId = 'LMS-Auth';
  const adminUsername = 'paragpatil187@gmail.com';
  const adminPassword = 'Paragpatil@21';
  useEffect(() => {
    
    registerUser()
   
  }, [])
  
const registerUser = async () => {
  console.log("run*********")
    // Step 1: Get access token
    const tokenUrl = `${serverUrl}/auth/realms/${realmName}/protocol/openid-connect/token`;
    const tokenRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        client_id: clientId,
        username: adminUsername,
        password: adminPassword,
      }),
    };
let accessToken;
    try {
      const tokenResponse = await fetch(tokenUrl, tokenRequest);
      const { access_token } = await tokenResponse.json();
      accessToken = access_token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return;
    }
    const newUser = {
      username: userData.regID,
      email: userData.emailID,
      firstName: userData.first_name,
      lastName: userData.last_name,
      credentials: [
        {
          type: 'password',
          value: "learn@nirmaan",
          temporary: false,
        },
      ],
      enabled: true,
    };
    console.log(newUser,"newUser")

    const createUserUrl = `${serverUrl}/auth/admin/realms/${realmName}/users`;
    const createUserRequest = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    };

    try {
      const createUserResponse = await fetch(createUserUrl, createUserRequest);
      const createdUser = await createUserResponse.json();
      console.log('User added:', createdUser);
    } catch (error) {
      console.error('Failed to add user:', error);
      return;
    }
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={registerUser}>Register User</button> */}
    </div>
  );
};

export default KeycloakUserRegistration;
