import registerClient from '../controllers/clients'

const testClient = {
    email: "client@client.hu",
    password:"password"
}

console.log(testClient);

test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
});


test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        await fetchData();
    } catch (e) {
        expect(e).toMatch('error');
    }
});
