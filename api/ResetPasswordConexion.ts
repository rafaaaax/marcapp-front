const API_URL = 'http://10.115.75.137:3000';

export const resetPassword = async (email: string, code: string, newPassword: string) => {
    try {
        const resetFetch = await fetch(`${API_URL}/user/reset-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                resetCode: code,
                newPassword: newPassword,
            })
        });
        if (resetFetch.ok) {
            return { success: true };
        } else {
            const response = await resetFetch.json();
            return { success: false, error: response.error };
        }
    } catch (error) {
        return { success: false, error: 'Server error' };
    }
};
