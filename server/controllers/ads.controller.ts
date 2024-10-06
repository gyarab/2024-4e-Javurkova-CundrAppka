import mongoose from 'mongoose'
import Ad from '../models/ads.model'

export const getAds = async (req, res) => {
    // returns all Ad components
	const ads = await Ad.find({});
	res.status(200).json(ads);
}

export const createAd = async (req, res) => {
    const data = req.body
    const newAd = new Ad(data)
    await newAd.save()
    res.status(200).json(newAd);
}

export const updateAd = async (req, res) => {
    const { id } = req.params
    const ad = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: "Inzerát se zadaným ID neexistuje" });
	}
    const updatedAd = await Ad.findByIdAndUpdate(id, ad, { new: true });
    res.status(200).json(updatedAd);
}

export const deleteAd = async (req, res) => {
    const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: "Inzerát se zadaným ID neexistuje" });
	}
    await Ad.findByIdAndDelete(id);
    res.status(200).json('Inzerát úspěšně smazán');
}
