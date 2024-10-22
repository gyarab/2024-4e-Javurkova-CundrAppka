import mongoose from 'mongoose'
import Ad from '../models/ads.model'

export const getAds = async (req, res) => {
    try {
        const ads = await Ad.find({})
        res.status(200).json({ success: true, data: ads })
    } catch (error) {
        console.log('Nastal error: ', error.message)
        res.status(500).json({ success: false, message: 'Při načítání inzerátů nastala chyba' })
    }
}

export const getAd = async (req, res) => {
    const { id } = req.params
    try {
        const ad = await Ad.findById(id)
        if (!ad) {
          return res.status(404).json({ success: false, message: 'Inzerát neexistuje' })
        }
        res.json({ success: true, data: ad })
      } catch (error) {
        res.status(500).json({ success: false, message: 'Při načítání inzerátu nastala chyba' })
    }
}

export const createAd = async (req, res) => {
    const data = req.body

    if (!data.title) {
		return res.status(400).json({ success: false, message: 'Vyplňte všechny pole' })
	}
    const newAd = new Ad(data)

    try {
        await newAd.save()
        res.status(201).json({ success: true, data: newAd })
    } catch (error) {
        console.log('Nastal error: ', error.message)
        res.status(500).json({ success: false, message: 'Při vytváření inzerátu nastala chyba' })
    }
}

export const updateAd = async (req, res) => {
    const { id } = req.params
    const ad = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: 'Inzerát se zadaným ID neexistuje' })
	}

    try {
        const updatedAd = await Ad.findByIdAndUpdate(id, ad, { new: true })
        res.status(200).json({ success: true, data: updatedAd })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Při úpravě inzerátu nastala chyba' })
    }
}

export const deleteAd = async (req, res) => {
    const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: 'Inzerát se zadaným ID neexistuje' })
	}

    try {
        await Ad.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: 'Inzerát úspěšně smazán' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Inzerát se nepodařilo smazat' })
    }
}
