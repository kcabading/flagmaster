

const Footer = function () {

    let date = new Date()

    return (
        <div className="footer text-center py-12 dark:bg-slate-900 dark:text-white">
            <span>All Rights Reserved @{date.getFullYear()}</span>
        </div>
    )
}

export default Footer