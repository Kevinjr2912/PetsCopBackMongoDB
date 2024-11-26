exports.getInformationAddress = async (req, res) => {
    const { codigo_postal } = req.params;
    const key = 'd1b726ba03907ec0e841c47d17c413fac4af7966';

    try {
        const response = await fetch(`https://api.tau.com.mx/dipomex/v1/codigo_postal?cp=${codigo_postal}`, {
            method: 'GET',
            headers: {
                'APIKEY': key,
            }
        });

        const data = await response.json();

        if (!data.error) {
            return res.json(data.codigo_postal.colonias);
        }

        return res.json({ error: "No se encontró dicho código postal" });

    } catch (err) {
        return res.json({ error: err });
    }
}