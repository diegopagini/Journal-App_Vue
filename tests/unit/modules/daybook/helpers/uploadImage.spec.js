/** @format */
import uploadImage from '@/modules/daybook/helpers/uploadImage';
import axios from 'axios';
import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: 'dfhtj8isz',
	api_key: '446868396816714',
	api_secret: 'ZNn9C2Ij_xG2I3TOQFcR4kQenmw',
});

describe('Upload Image', () => {
	it('Should upload a file and return a url', async () => {
		const { data } = await axios.get(
			`https://res.cloudinary.com/dfhtj8isz/image/upload/v1692006702/rlktggh4wrlllibwta2l.jpg`,
			{
				responseType: 'arraybuffer',
			}
		);

		const file = new File([data], 'img.png');

		const url = await uploadImage(file);

		expect(typeof url).toBe('string');

		const segments = url.split('/');
		const imageId = segments.at(-1).replace('.jpg', '');

		await cloudinary.v2.api.delete_resources(imageId);
	});
});
