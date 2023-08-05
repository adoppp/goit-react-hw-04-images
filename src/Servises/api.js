export const fetchImages = async (name, page = 1) => {
    const key = '37837033-b275b0d8f4f032e99cd88a403';
    const response = await fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
    if (response.ok) {
        return response.json();
    }
    return await Promise.reject(`No image found with the name ${name}`);
}