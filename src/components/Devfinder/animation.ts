export const componentVariants = {
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            y: {
                delay: (index + 1) * 0.3,
                duration: 0.7,
                ease: 'easeOut',
            },

            opacity: {
                delay: (index + 1) * 0.4,
                duration: 0.6,
                ease: 'easeOut',
            },
        }
    }),
    hidden: { opacity: 0, y: 150 }
}