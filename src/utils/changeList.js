export default function changeList() {
  const pages = await request(`/documents`, {
    method: 'GET',
  });
  pageList.setState(pages);
}
