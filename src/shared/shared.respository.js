class SharedRepository {
    PER_PAGE = 50;

    async getPaginatedData({ page = 1, per_page: take = this.PER_PAGE, where, repository, others = {} }) {
        const skip = take * (page - 1);
        delete where.page;
        delete where.per_page;
        const {...other_where } = where; //removed page and per_page from where
        try {
            const options = {
                skip,
                ...others,
                take: parseInt(take.toString()),
                orderBy: {
                    created_at: 'desc',
                },
                where: {...other_where },
            };
            if (take == 0) delete options.take;
            const records = await repository.findMany(options);
            const total_records = await repository.count({
                where: {...other_where },
            });
            let next_page = false;
            if (page < Math.ceil(total_records / take)) next_page = true;
            const previous_page = page == 1 ? false : true;

            return {
                records,
                metadata: {
                    total_records,
                    previous_page,
                    next_page,
                    current_page: page,
                },
            };
        } catch (error) {
            console.log(error);
            return {
                records: [],
                metadata: {
                    total_records: 0,
                    previous_page: false,
                    next_page: false,
                    current_page: 1,
                },
            };
        }
    }
}

module.exports = new SharedRepository();